'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from './navbar.module.css';
import SignIn from './sign-in';
import { onAuthStateChangedHelper } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  });

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <span className={styles.logoContainer}>
          <Image width={90} height={20} src="/youtube-logo.svg" alt="YouTube Logo" />
        </span>
      </Link>
      <SignIn user={user} />
    </nav>
  );
}
