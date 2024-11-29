"use client"

import { useRouter } from "next/navigation";


export default function GuestHome() {
  const router = useRouter()
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <h1>This is the landing page.</h1>
      <h2>A landing page is like a home page, but fancier.</h2>
      <div>
      <h2>Power Your Home with Solar Energy</h2>
      <p>Join thousands of citizens in the fight against global warming and make your home a part of the solution! By installing solar panels, you can reduce your carbon footprint, lower your energy bills, and contribute to a brighter, more sustainable future for our city. Solar energy is clean, renewable, and the perfect way to take advantage of the abundant sunshine.</p>
      </div>
      <div>
      <h2>Why Choose Our Solar Panel Planning App?</h2>
      <p>We understand that planning solar panel installation can feel overwhelming. That’s why Los Angeles has developed this free, user-friendly app to simplify the process and bring solar energy within reach for every resident.</p>
      </div>
      <div>
      <h2>Benefits of Going Solar</h2>
      <ul>
        <li>Save Money: Cut your electricity costs with solar-powered energy.</li>
        <li>Boost Property Value: Solar panels increase the value of your home.</li>
        <li>Protect the Environment: Reduce reliance on fossil fuels and help combat global warming.</li>
        <li>Energy Independence: Harness the power of the sun to reduce dependence on traditional utilities.</li>
      </ul>
      </div>
      <div>
      <h1>Get Started Today!</h1>
      <p>Our solar planning app makes it easy to schedule your evaluation and take the first step toward clean energy. Start your solar journey now—schedule your free visit and let’s build a greener Los Angeles together!</p>
      <button onClick={() => router.push("/signup")}>Get started!</button>
      </div>
      </main>
    </div>
  );
}
