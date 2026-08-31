import styles from './auth.module.css';

export function SignOutForm({ returnTo = '/' }: { returnTo?: string }) {
  return (
    <form action="/auth/signout" method="post">
      <input name="return_to" type="hidden" value={returnTo} />
      <button className={styles.signOutButton} type="submit">Sign out</button>
    </form>
  );
}
