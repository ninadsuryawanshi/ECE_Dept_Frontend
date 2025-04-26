import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { 
  FaLinkedinIn, 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkedAlt
} from 'react-icons/fa';

// Achievement data
const achievementData = {
  Department: [
    {
      icon: "🏆",
      title: "NAAC A++ Accreditation",
      date: "November 2023",
      description: "The ECE department received the highest grade in NAAC accreditation for excellence in teaching and research infrastructure."
    },
    {
      icon: "🎓",
      title: "Best Engineering Department Award",
      date: "March 2023",
      description: "Recognized by the State Technical Education Board for outstanding contribution to technical education."
    },
    {
      icon: "📚",
      title: "Research Excellence Award",
      date: "January 2023",
      description: "Received for publishing the highest number of research papers among all engineering departments."
    }
  ],
  Faculty: [
    {
      icon: "🌟",
      title: "Dr. Jane Smith - IEEE Fellowship",
      date: "December 2023",
      description: "Honored with the prestigious IEEE Fellowship for contributions to embedded systems research."
    },
    {
      icon: "📝",
      title: "Prof. Mark Wilson - Best Paper Award",
      date: "October 2023",
      description: "Received the Best Paper Award at the International Conference on Communication Systems."
    },
    {
      icon: "👨‍🏫",
      title: "Prof. Emily Johnson - Outstanding Teacher",
      date: "September 2023",
      description: "Voted as the Outstanding Teacher of the Year by students for excellence in teaching Embedded Systems."
    }
  ],
  Students: [
    {
      icon: "💻",
      title: "National Hackathon Winners",
      date: "February 2024",
      description: "Team of 4 ECE students won the first prize at the National IoT Hackathon organized by TechMinds India."
    },
    {
      icon: "🤖",
      title: "Robotics Competition",
      date: "November 2023",
      description: "Second place in the Inter-College Robotics Competition held at IIT Delhi."
    },
    {
      icon: "📈",
      title: "Highest Placement Rate",
      date: "June 2023",
      description: "ECE department achieved 95% placement rate with average package of 8.5 LPA for the 2023 batch."
    }
  ],
  Research: [
    {
      icon: "🔬",
      title: "AI Research Grant",
      date: "December 2023",
      description: "Secured ₹1.5 Crore research grant for AI in Healthcare project."
    },
    {
      icon: "🏭",
      title: "Industry Collaboration",
      date: "October 2023",
      description: "Partnership with leading tech companies for research in IoT and Edge Computing."
    },
    {
      icon: "📱",
      title: "Patent Granted",
      date: "August 2023",
      description: "Department's research team granted patent for innovative mobile security solution."
    }
  ]
};

// Animated background sphere component
const AnimatedSphere = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Sphere ref={mesh} args={[1, 100, 200]} scale={1.5} position={[0, 0, -2]}>
      <MeshDistortMaterial
        color="#007AFF"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.6}
        opacity={0.3}
        transparent={true}
      />
    </Sphere>
  );
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Department');
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  const particlesConfig = {
    fullScreen: false,
    detectRetina: true,
    fpsLimit: 60,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#007AFF", "#00C6FF", "#ffffff"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.6,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#007AFF",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out"
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "bubble"]
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.8
          }
        },
        bubble: {
          distance: 200,
          size: 6,
          duration: 0.2,
          opacity: 0.8,
          speed: 3
        },
        push: {
          quantity: 4
        }
      }
    }
  };

  return (
    <Container>
      <Header>
        <Logo>ECE</Logo>
        <Nav>
          <NavItem>ABOUT</NavItem>
          <NavItem>ACADEMICS</NavItem>
          <NavItem>RESEARCH</NavItem>
          <NavItem>FACULTY</NavItem>
          <NavItem>CONTACT</NavItem>
          <LoginButton>LOGIN</LoginButton>
        </Nav>
      </Header>

      <HeroSection>
        <ParticlesBackground
          id="tsparticles"
          init={particlesInit}
          options={particlesConfig}
        />
        <CanvasContainer>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
          </Canvas>
        </CanvasContainer>
        <HeroContent>
          <motion.div
            style={{ scale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HeroTitle>ECE</HeroTitle>
            <SubTitle
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Electronics and Computer Engineering
            </SubTitle>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <AboutSection>
        <AboutContainer>
          <AboutImage>
            <img src="/about-illustration.svg" alt="About Us Illustration" />
          </AboutImage>
          <AboutContent>
            <SectionTitle>About Us</SectionTitle>
            <AboutText>
              We are a passionate team of innovators dedicated to pushing the boundaries of Electronics & Computer Engineering. Our goal is to create impactful solutions that bridge technology and real-world challenges.
            </AboutText>
            <AboutText>
              With a strong focus on innovation, research, and collaboration, we strive to equip students and professionals with the skills they need to excel in the tech-driven world.
            </AboutText>
            <LearnMoreButton>Know More</LearnMoreButton>
          </AboutContent>
        </AboutContainer>
      </AboutSection>

      <ContentSection>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>
            Welcome to Electronics and Computer Engineering
          </SectionTitle>
          <Description>
            In the ever-evolving landscape of technology, the discipline of Electronics and Computer Engineering (ECE) 
            stands as one of the pillars of innovation, shaping the evolving world as we know it.
          </Description>
        </motion.div>
      </ContentSection>

      <FeaturesSection>
        <FeatureGrid>
          <Feature>
            <FeatureIcon>🎓</FeatureIcon>
            <FeatureTitle>Academic Excellence</FeatureTitle>
            <FeatureText>
              Comprehensive curriculum designed to meet industry demands.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>🔬</FeatureIcon>
            <FeatureTitle>Research Focus</FeatureTitle>
            <FeatureText>
              Cutting-edge research in AI, ML, and Embedded Systems.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>🌐</FeatureIcon>
            <FeatureTitle>Industry Connect</FeatureTitle>
            <FeatureText>
              Strong industry partnerships ensuring real-world exposure.
            </FeatureText>
          </Feature>
        </FeatureGrid>
      </FeaturesSection>

      <StatsSection>
        <StatGrid>
          <Stat>
            <StatNumber>60+</StatNumber>
            <StatLabel>Students per Batch</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>100%</StatNumber>
            <StatLabel>Placement Rate</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>20+</StatNumber>
            <StatLabel>Research Papers</StatLabel>
          </Stat>
        </StatGrid>
      </StatsSection>

      <AchievementsSection>
        <SectionTitle>Achievements</SectionTitle>
        <TabContainer>
          {Object.keys(achievementData).map((tab) => (
            <TabButton
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </TabContainer>
        <AchievementGrid>
          {achievementData[activeTab].map((achievement, index) => (
            <AchievementCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AchievementIcon>{achievement.icon}</AchievementIcon>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementDate>{achievement.date}</AchievementDate>
              <AchievementDescription>
                {achievement.description}
              </AchievementDescription>
            </AchievementCard>
          ))}
        </AchievementGrid>
      </AchievementsSection>

      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterLogo>
              <LogoImage>Ed</LogoImage>
              <LogoText>Excellence in Engineering Education Since 1983</LogoText>
            </FooterLogo>
            <SocialLinks>
              <SocialLink href="#"><LinkedInIcon /></SocialLink>
              <SocialLink href="#"><TwitterIcon /></SocialLink>
              <SocialLink href="#"><FacebookIcon /></SocialLink>
              <SocialLink href="#"><InstagramIcon /></SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Contact Information</FooterTitle>
            <ContactInfo>
              <ContactItem>
                <LocationIcon />
                A3 4th Floor, PICT, Survey No. 27, Near Trimurti Chowk,
                Bharati Vidyapeeth Campus, Dhankawadi,
                Pune, Maharashtra 411043
              </ContactItem>
              <ContactItem>
                <EmailIcon />
                registrar@pict.edu
              </ContactItem>
              <ContactItem>
                <PhoneIcon />
                +91 20 2437 1101
              </ContactItem>
              <ContactItem>
                <MapIcon />
                <MapLink href="#">View on Google Maps</MapLink>
              </ContactItem>
            </ContactInfo>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <QuickLinks>
              <QuickLinksColumn>
                <QuickLink href="#">About PICT</QuickLink>
                <QuickLink href="#">Admissions</QuickLink>
                <QuickLink href="#">Academics</QuickLink>
                <QuickLink href="#">Research</QuickLink>
              </QuickLinksColumn>
              <QuickLinksColumn>
                <QuickLink href="#">Facilities</QuickLink>
                <QuickLink href="#">Event Spaces</QuickLink>
                <QuickLink href="#">Privacy Policy</QuickLink>
                <QuickLink href="#">Careers</QuickLink>
              </QuickLinksColumn>
            </QuickLinks>
          </FooterSection>
        </FooterContent>
        <FooterBottom>
          <Copyright>© 2025 Pune Institute of Computer Technology. All Rights Reserved.</Copyright>
          <FooterLinks>
            <FooterLink href="#">Terms of Use</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Sitemap</FooterLink>
          </FooterLinks>
        </FooterBottom>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavItem = styled.a`
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #007AFF;
  }
`;

const LoginButton = styled.button`
  background: #007AFF;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(0,122,255,0.15) 0%, rgba(0,0,0,0) 70%);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vh;
    background: radial-gradient(circle at center, rgba(0,122,255,0.1) 0%, rgba(0,0,0,0) 70%);
    filter: blur(60px);
    z-index: 0;
  }
`;

const ParticlesBackground = styled(Particles)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  canvas {
    position: absolute !important;
  }
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.4;
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 25rem;
  font-weight: 900;
  margin-bottom: 2rem;
  background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(255,255,255,0.2));
  letter-spacing: -0.05em;
  line-height: 0.8;
  transition: all 0.3s ease;
  position: relative;
  mix-blend-mode: overlay;

  &::after {
    content: 'ECE';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(30px);
    background: linear-gradient(to right, rgba(0,122,255,0.5), rgba(0,198,255,0.5));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.5;
  }

  &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0 0 30px rgba(0,122,255,0.4));

    &::after {
      filter: blur(40px);
      opacity: 0.8;
    }
  }

  @media (max-width: 1200px) {
    font-size: 15rem;
  }

  @media (max-width: 768px) {
    font-size: 10rem;
  }
`;

const SubTitle = styled(motion.h2)`
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: -2rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  
  @media (max-width: 1200px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ContentSection = styled.section`
  padding: 6rem 4rem;
  background: #111;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const FeaturesSection = styled.section`
  padding: 8rem 4rem;
  background: #0a0a0a;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled.div`
  padding: 2rem;
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
`;

const StatsSection = styled.section`
  padding: 6rem 4rem;
  background: #111;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255,255,255,0.05);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  color: #007AFF;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgba(255,255,255,0.7);
  font-size: 1.1rem;
`;

const AchievementsSection = styled.section`
  padding: 8rem 4rem;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(0,122,255,0.1) 0%, rgba(0,0,0,0) 70%);
    pointer-events: none;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

const TabButton = styled.button`
  background: ${props => props.active ? '#007AFF' : 'transparent'};
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid ${props => props.active ? '#007AFF' : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.8rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: ${props => props.active ? '#007AFF' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.active ? '#007AFF' : '#007AFF'};
    transform: translateY(-2px);
  }
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const AchievementCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #007AFF, transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 122, 255, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const AchievementIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px rgba(0, 122, 255, 0.3));
`;

const AchievementTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const AchievementDate = styled.div`
  color: #007AFF;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const AchievementDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const AboutSection = styled.section`
  padding: 8rem 4rem;
  background: #111;
  position: relative;
  overflow: hidden;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const AboutImage = styled.div`
  img {
    width: 100%;
    max-width: 500px;
    height: auto;
  }

  @media (max-width: 968px) {
    order: -1;
    margin: 0 auto;
  }
`;

const AboutContent = styled.div`
  h2 {
    text-align: left;
    
    @media (max-width: 968px) {
      text-align: center;
    }
  }
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
`;

const LearnMoreButton = styled.button`
  background: transparent;
  color: #007AFF;
  padding: 0.8rem 2rem;
  border: 2px solid #007AFF;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #007AFF;
    color: #fff;
    transform: translateY(-2px);
  }
`;

const Footer = styled.footer`
  background: #0a0a0a;
  padding: 6rem 4rem 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FooterSection = styled.div``;

const FooterLogo = styled.div`
  margin-bottom: 2rem;
`;

const LogoImage = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  color: #007AFF;
  margin-bottom: 1rem;
`;

const LogoText = styled.p`
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #007AFF;
  }
`;

const FooterTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.6;

  svg {
    color: #007AFF;
    font-size: 1.2rem;
    margin-top: 0.2rem;
  }
`;

const MapLink = styled.a`
  color: #007AFF;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const QuickLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const QuickLinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuickLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #007AFF;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #007AFF;
  }
`;

// Icons components (you can replace these with your preferred icon library)
const LinkedInIcon = () => <FaLinkedinIn />;
const TwitterIcon = () => <FaTwitter />;
const FacebookIcon = () => <FaFacebookF />;
const InstagramIcon = () => <FaInstagram />;
const LocationIcon = () => <FaMapMarkerAlt />;
const EmailIcon = () => <FaEnvelope />;
const PhoneIcon = () => <FaPhone />;
const MapIcon = () => <FaMapMarkedAlt />;

export default HomePage; 