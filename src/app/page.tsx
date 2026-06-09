import Image from "next/image";
import {
  AiFillAudio,
  AiFillBulb,
  AiFillFileText,
} from "react-icons/ai";
import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import { LoginButton } from "@/components/LoginButton";

const footerGroups = [
  {
    title: "Actions",
    links: ["Summarist Magazine", "Cancel Subscription", "Help", "Contact us"],
  },
  {
    title: "Useful Links",
    links: ["Pricing", "Summarist Business", "Gift Cards", "Authors & Publishers"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Code of Conduct"],
  },
  {
    title: "Other",
    links: ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"],
  },
];

const features = [
  {
    icon: <AiFillFileText aria-hidden="true" />,
    title: "Read or listen",
    subtitle: "Save time by getting the core ideas from the best books.",
  },
  {
    icon: <AiFillBulb aria-hidden="true" />,
    title: "Find your next read",
    subtitle: "Explore book lists and personalized recommendations.",
  },
  {
    icon: <AiFillAudio aria-hidden="true" />,
    title: "Briefcasts",
    subtitle: "Gain valuable insights from briefcasts",
  },
];

const topHeadings = [
  "Enhance your knowledge",
  "Achieve greater success",
  "Improve your health",
  "Develop better parenting skills",
  "Increase happiness",
  "Be the best version of yourself!",
];

const bottomHeadings = [
  "Expand your learning",
  "Accomplish your goals",
  "Strengthen your vitality",
  "Become a better caregiver",
  "Improve your mood",
  "Maximize your abilities",
];

const topStats = [
  {
    number: "93%",
    text: (
      <>
        of Summarist members <b>significantly increase</b> reading frequency.
      </>
    ),
  },
  {
    number: "96%",
    text: (
      <>
        of Summarist members <b>establish better</b> habits.
      </>
    ),
  },
  {
    number: "90%",
    text: (
      <>
        have made <b>significant positive</b> change to their lives.
      </>
    ),
  },
];

const bottomStats = [
  {
    number: "91%",
    text: (
      <>
        of Summarist members <b>report feeling more productive</b> after
        incorporating the service into their daily routine.
      </>
    ),
  },
  {
    number: "94%",
    text: (
      <>
        of Summarist members have <b>noticed an improvement</b> in their overall
        comprehension and retention of information.
      </>
    ),
  },
  {
    number: "88%",
    text: (
      <>
        of Summarist members <b>feel more informed</b> about current events and
        industry trends since using the platform.
      </>
    ),
  },
];

const reviews = [
  {
    name: "Hanna M.",
    body: (
      <>
        This app has been a <b>game-changer</b> for me! It&apos;s saved me so
        much time and effort in reading and comprehending books. Highly
        recommend it to all book lovers.
      </>
    ),
  },
  {
    name: "David B.",
    body: (
      <>
        I love this app! It provides <b>concise and accurate summaries</b> of
        books in a way that is easy to understand. It&apos;s also very
        user-friendly and intuitive.
      </>
    ),
  },
  {
    name: "Nathan S.",
    body: (
      <>
        This app is a great way to get the main takeaways from a book without
        having to read the entire thing.{" "}
        <b>The summaries are well-written and informative.</b> Definitely worth
        downloading.
      </>
    ),
  },
  {
    name: "Ryan R.",
    body: (
      <>
        If you&apos;re a busy person who{" "}
        <b>loves reading but doesn&apos;t have the time</b> to read every book
        in full, this app is for you! The summaries are thorough and provide a
        great overview of the book&apos;s content.
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image
              className="nav__img"
              src="/assets/logo.png"
              alt="Summarist"
              width={495}
              height={114}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </figure>
          <ul className="nav__list--wrapper">
            <li>
              <LoginButton className="nav__list nav__list--login" />
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="landing">
          <div className="container">
            <div className="row">
              <div className="landing__wrapper">
                <div className="landing__content">
                  <h1 className="landing__content__title">
                    Gain more knowledge <br className="remove--tablet" />
                    in less time
                  </h1>
                  <p className="landing__content__subtitle">
                    Great summaries for busy people,
                    <br className="remove--tablet" />{" "}
                    individuals who barely have time to read,
                    <br className="remove--tablet" />{" "}
                    and even people who don&apos;t like to read.
                  </p>
                  <LoginButton className="btn home__cta--btn" />
                </div>
                <figure className="landing__image--mask">
                  <Image
                    src="/assets/landing.png"
                    alt="Person reading Summarist summaries"
                    width={779}
                    height={740}
                    style={{ width: "100%", height: "auto" }}
                    priority
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="container">
            <div className="row">
              <h2 className="section__title">Understand books in few minutes</h2>
              <div className="features__wrapper">
                {features.map((feature) => (
                  <div className="features" key={feature.title}>
                    <div className="features__icon">{feature.icon}</div>
                    <h3 className="features__title">{feature.title}</h3>
                    <p className="features__sub--title">{feature.subtitle}</p>
                  </div>
                ))}
              </div>

              <div className="statistics__wrapper">
                <div className="statistics__content--header">
                  {topHeadings.map((heading, index) => (
                    <div
                      className={`statistics__heading ${
                        index === 0 ? "statistics__heading--active" : ""
                      }`}
                      key={heading}
                    >
                      {heading}
                    </div>
                  ))}
                </div>
                <div className="statistics__content--details">
                  {topStats.map((stat) => (
                    <div className="statistics__data" key={stat.number}>
                      <div className="statistics__data--number">
                        {stat.number}
                      </div>
                      <div className="statistics__data--title">{stat.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="statistics__wrapper">
                <div className="statistics__content--details statistics__content--details-second">
                  {bottomStats.map((stat) => (
                    <div className="statistics__data" key={stat.number}>
                      <div className="statistics__data--number">
                        {stat.number}
                      </div>
                      <div className="statistics__data--title">{stat.text}</div>
                    </div>
                  ))}
                </div>
                <div className="statistics__content--header statistics__content--header-second">
                  {bottomHeadings.map((heading) => (
                    <div className="statistics__heading" key={heading}>
                      {heading}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews">
          <div className="row">
            <div className="container">
              <h2 className="section__title">What our members say</h2>
              <div className="reviews__wrapper">
                {reviews.map((review) => (
                  <article className="review" key={review.name}>
                    <div className="review__header">
                      <h3 className="review__name">{review.name}</h3>
                      <div className="review__stars" aria-label="5 star review">
                        <BsStarFill aria-hidden="true" />
                      </div>
                    </div>
                    <p className="review__body">{review.body}</p>
                  </article>
                ))}
              </div>
              <div className="reviews__btn--wrapper">
                <LoginButton className="btn home__cta--btn" />
              </div>
            </div>
          </div>
        </section>

        <section id="numbers">
          <div className="container">
            <div className="row">
              <h2 className="section__title">Start growing with Summarist now</h2>
              <div className="numbers__wrapper">
                <div className="numbers">
                  <div className="numbers__icon">
                    <BiCrown aria-hidden="true" />
                  </div>
                  <div className="numbers__title">3 Million</div>
                  <div className="numbers__sub--title">
                    Downloads on all platforms
                  </div>
                </div>
                <div className="numbers">
                  <div className="numbers__icon numbers__star--icon">
                    <BsStarFill aria-hidden="true" />
                    <BsStarHalf aria-hidden="true" />
                  </div>
                  <div className="numbers__title">4.5 Stars</div>
                  <div className="numbers__sub--title">
                    Average ratings on iOS and Google Play
                  </div>
                </div>
                <div className="numbers">
                  <div className="numbers__icon">
                    <RiLeafLine aria-hidden="true" />
                  </div>
                  <div className="numbers__title">97%</div>
                  <div className="numbers__sub--title">
                    Of Summarist members create a better reading habit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="footer__top--wrapper">
              {footerGroups.map((group) => (
                <div className="footer__block" key={group.title}>
                  <div className="footer__link--title">{group.title}</div>
                  <div>
                    {group.links.map((link) => (
                      <div className="footer__link--wrapper" key={link}>
                        <a className="footer__link">{link}</a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="footer__copyright--wrapper">
              <div className="footer__copyright">
                Copyright &copy; 2023 Summarist.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
