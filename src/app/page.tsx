"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { Container } from "react-bootstrap";
import Header from "@/components/app.header";
import Footer from "@/components/app.footer";

export default function Home() {
  return (
    <>
      <Container>
        <Header />

        {/* <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}

        <div className={styles.grid} style={{ marginTop: 30 }}>
          <Link href="/blogs" className={styles.card} rel="noopener noreferrer">
            <h2>
              Blogs <span>-&gt;</span>
            </h2>
            <p>Interface CRUD!!!</p>
          </Link>

          <Link
            href="/youtube"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Youtube <span>-&gt;</span>
            </h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </Link>

          <Link
            href="/facebook"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Facebook <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </Link>

          <Link href="/tiki" className={styles.card} rel="noopener noreferrer">
            <h2>
              Tiki <span>-&gt;</span>
            </h2>
            <p>Explore the Next.js 13 playground.</p>
          </Link>

          <Link className={styles.card} href="/admin">
            <h2>
              Admin <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </Link>
        </div>
        <Footer />
      </Container>
    </>
  );
}
