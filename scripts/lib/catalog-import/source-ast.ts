import ts from '../../../apps/web/node_modules/typescript/lib/typescript.js';
import { invariant } from './security.js';

/** Read literal registry metadata without executing upstream JavaScript. */
export function sourceFile(text: string) {
  return ts.createSourceFile('source.tsx', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

export function literalValues(text: string) {
  const source = sourceFile(text);
  const declarations = new Map<string, ts.Expression>();
  for (const statement of source.statements) if (ts.isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) declarations.set(declaration.name.text, declaration.initializer);
    }
  }
  function read(node: ts.Node, visited = new Set<string>()): unknown {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) return read(node.expression, visited);
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(element => read(element, visited));
    if (ts.isObjectLiteralExpression(node)) {
      const result: Record<string, unknown> = Object.create(null);
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) result[property.name.getText(source).replace(/^["']|["']$/g, '')] = read(property.initializer, visited);
        else if (ts.isShorthandPropertyAssignment(property)) result[property.name.text] = read(property.name, visited);
      }
      return result;
    }
    if (ts.isIdentifier(node) && declarations.has(node.text) && !visited.has(node.text)) {
      return read(declarations.get(node.text)!, new Set([...visited, node.text]));
    }
    return undefined;
  }
  return new Map([...declarations].map(([name, expression]) => [name, read(expression)]));
}

export function imports(text: string) {
  const source = sourceFile(text);
  const found: { specifier: string; typeOnly: boolean }[] = [];
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const clause = statement.importClause;
      const typeOnly = Boolean(clause?.isTypeOnly) || Boolean(clause && !clause.name && clause.namedBindings
        && ts.isNamedImports(clause.namedBindings) && clause.namedBindings.elements.length
        && clause.namedBindings.elements.every(element => element.isTypeOnly));
      found.push({ specifier: statement.moduleSpecifier.text, typeOnly });
    }
    if (ts.isExportDeclaration(statement) && statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)) {
      found.push({ specifier: statement.moduleSpecifier.text, typeOnly: statement.isTypeOnly });
    }
  }
  function dynamic(node: ts.Node) {
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      invariant(node.arguments.length === 1 && ts.isStringLiteralLike(node.arguments[0]), 'Dynamic source imports must use a pinned literal path');
      found.push({specifier:node.arguments[0].text,typeOnly:false});
    }
    ts.forEachChild(node,dynamic);
  }
  dynamic(source);
  return found;
}

/** Describe finite directory-local module templates; discovery closes them over the pinned Git tree. */
export function templateImports(text: string) {
  const source=sourceFile(text);
  const templates: {expression:string;prefix:string;suffix:string;variable:string}[]=[];
  function visit(node:ts.Node) {
    if(ts.isCallExpression(node) && node.expression.kind===ts.SyntaxKind.ImportKeyword) {
      const argument=node.arguments[0];
      if(argument && ts.isTemplateExpression(argument) && argument.templateSpans.length===1 && ts.isIdentifier(argument.templateSpans[0].expression)) {
        invariant(argument.head.text.startsWith('./'),'Only directory-local module templates can be closed over the pinned inventory');
        templates.push({expression:node.getText(source),prefix:argument.head.text,suffix:argument.templateSpans[0].literal.text,variable:argument.templateSpans[0].expression.text});
      }
    }
    ts.forEachChild(node,visit);
  }
  visit(source);return templates;
}

export function previewExport(text: string) {
  const source = sourceFile(text);
  if (source.statements.some(statement=>ts.isExportAssignment(statement) && !statement.isExportEquals
    || (ts.canHaveModifiers(statement) && ts.getModifiers(statement)?.some(modifier=>modifier.kind===ts.SyntaxKind.DefaultKeyword)))) return 'default';
  for (const statement of source.statements) {
    if (ts.isExportAssignment(statement) && !statement.isExportEquals) return 'default';
    const modifiers = ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined;
    if (!modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    if (modifiers.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)) return 'default';
    if (ts.isFunctionDeclaration(statement) && statement.name && /^[A-Z]/.test(statement.name.text)) return statement.name.text;
    if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && /^[A-Z]/.test(declaration.name.text)
        && declaration.initializer && (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer))) return declaration.name.text;
    }
  }
  return undefined;
}

export function mantineTemplate(text: string, name = 'code') {
  const values = literalValues(text);
  const code = values.get(name);
  invariant(typeof code === 'string', `Missing static Mantine template: ${name}`);
  const properties: Record<string, unknown> = {};
  for (const value of values.values()) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
    const demo = value as { controls?: { prop?: string; initialValue?: unknown }[]; type?: string };
    if (demo.type !== 'configurator') continue;
    for (const control of demo.controls ?? []) if (control.prop && control.initialValue !== undefined) properties[control.prop] = control.initialValue;
  }
  const props = Object.entries(properties).map(([key, value]) => {
    invariant(/^[a-zA-Z][\w-]*$/.test(key), `Invalid configurator property: ${key}`);
    return `${key}={${JSON.stringify(value)}}`;
  }).join(' ');
  return code.replace(/\{\{props\}\}/g, props ? ' ' + props : '');
}

/** Keep the runtime dependency closure of every documented demo; omit documentation scaffolding. */
export function mantineRuntime(text: string) {
  const source = sourceFile(text);
  const values = literalValues(text);
  const factories: string[] = [];
  for (const statement of source.statements) if (ts.isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isObjectBindingPattern(declaration.name) && declaration.initializer && ts.isCallExpression(declaration.initializer)
        && /^getSharedPicker(?:Input)?Demos$/.test(declaration.initializer.expression.getText(source))) {
        for (const element of declaration.name.elements) {
          invariant(ts.isIdentifier(element.name), 'Invalid demo binding');
          factories.push(element.name.text);
        }
      }
    }
  }
  if (factories.length) {
    const body = source.statements.filter(statement=>!ts.isExportDeclaration(statement)).map(statement=>statement.getText(source)).join('\n');
    return body + '\n' + factories.map((name,index)=>`// Rendyn variant: ${name}\nexport function RendynExample${index ? index+1 : ''}() {\n  const Render = ${name}.component;\n  const props = Object.fromEntries((${name}.controls ?? []).filter(control => /^[A-Za-z][\\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));\n  return <Render {...props} />;\n}`).join('\n');
  }
  const demos: {name: string; expression: ts.Expression; props: string}[] = [];
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
      const component = declaration.initializer.properties.find(property => ts.isPropertyAssignment(property) && property.name.getText(source) === 'component');
      if (!component || !ts.isPropertyAssignment(component)) continue;
      const demo = ts.isIdentifier(declaration.name) ? values.get(declaration.name.text) as { controls?: {prop: string; initialValue: unknown}[] } : undefined;
      const props = (demo?.controls ?? []).filter(control => control?.prop && control.initialValue !== undefined).map(control => {
        invariant(/^[A-Za-z][\w-]*$/.test(control.prop), 'Invalid configurator prop');
        return `${control.prop}={${JSON.stringify(control.initialValue)}}`;
      }).join(' ');
      demos.push({name: demos.length ? `RendynExample${demos.length+1}` : 'RendynExample',expression:component.initializer,props});
    }
  }
  invariant(demos.length > 0, 'Documented demo has no renderable component');
  const references = new Set<string>();
  function scan(node: ts.Node) {
    if (ts.isTypeNode(node)) return;
    if (ts.isPropertyAccessExpression(node)) { scan(node.expression); return; }
    if (ts.isPropertyAssignment(node)) { scan(node.initializer); return; }
    if (ts.isJsxAttribute(node)) { if (node.initializer) scan(node.initializer); return; }
    if (ts.isVariableDeclaration(node) || ts.isParameter(node)) { if (node.initializer) scan(node.initializer); return; }
    if (ts.isIdentifier(node)) references.add(node.text);
    ts.forEachChild(node,scan);
  }
  for (const demo of demos) scan(demo.expression);
  const kept = new Set<ts.Statement>();
  let changed = true;
  while (changed) {
    changed = false;
    for (const statement of source.statements) {
      if (kept.has(statement) || ts.isImportDeclaration(statement)) continue;
      const names = ts.isVariableStatement(statement) ? statement.declarationList.declarations.map(d=>d.name.getText(source)) :
        (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isEnumDeclaration(statement)) && statement.name ? [statement.name.text] : [];
      if (names.some(name=>references.has(name))) { kept.add(statement); scan(statement); changed=true; }
    }
  }
  for(const statement of source.statements) if(ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) kept.add(statement);
  const runtimeText=source.statements.filter(statement=>kept.has(statement)).map(statement=>statement.getText(source)).join('\n');
  for (const statement of source.statements) if (ts.isImportDeclaration(statement)) {
    const clause=statement.importClause;
    const names = clause ? [clause.name?.text,...(clause.namedBindings && ts.isNamedImports(clause.namedBindings) ? clause.namedBindings.elements.map(e=>e.name.text) : clause.namedBindings ? [clause.namedBindings.name.text] : [])] : [];
    if (!clause || names.some(name=>name && (references.has(name) || new RegExp('\\b'+name+'\\b').test(runtimeText)))) kept.add(statement);
  }
  const body = source.statements.filter(statement=>kept.has(statement)).map(statement=>statement.getText(source)).join('\n\n');
  return body + '\n' + demos.map(demo=>`const ${demo.name}Component = ${demo.expression.getText(source)};\nexport function ${demo.name}() { return <${demo.name}Component ${demo.props} />; }`).join('\n') + '\n';
}
