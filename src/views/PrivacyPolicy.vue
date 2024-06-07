<template>
  <div class="privacy-policy">
    <h1>Privacy Policy</h1>
    <p>Last updated: June 7, 2024</p>
    
    <section v-for="section in policySections" :key="section.title" class="policy-section">
      <h2>{{ section.title }}</h2>
      <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicy",
  data() {
    return {
      policySections: [
        {
          title: "Introduction",
          paragraphs: [
            "Welcome to our web app. We are committed to protecting your personal data and respecting your privacy.",
            "This Privacy Policy explains how we collect, use, and safeguard your information when you use our services for reviewing movies, TV shows, games, and books."
          ]
        },
        {
          title: "Information We Collect",
          paragraphs: [
            "We collect various types of information in connection with the services we provide, including:",
            "Personal Data: Name, email address, and other contact information.",
            "Usage Data: Information about how you use our services, such as your interactions with content and other users."
          ]
        },
        {
          title: "How We Use Your Information",
          paragraphs: [
            "We use your information to provide and improve our services, including:",
            "To personalize your experience and deliver content tailored to your interests.",
            "To communicate with you about updates, offers, and promotions."
          ]
        },
        {
          title: "Sharing Your Information",
          paragraphs: [
            "We may share your information with third parties in certain circumstances, including:",
            "With service providers who assist us in operating our services.",
            "In response to legal requests or to protect our rights."
          ]
        },
        {
          title: "Your Rights",
          paragraphs: [
            "You have certain rights regarding your personal data, including:",
            "The right to access and update your personal information.",
            "The right to request the deletion of your data under certain conditions."
          ]
        },
        {
          title: "Security of Your Information",
          paragraphs: [
            "We implement appropriate technical and organizational measures to protect your information from unauthorized access, use, or disclosure.",
            "However, please be aware that no method of transmission over the Internet or method of electronic storage is completely secure."
          ]
        },
        {
          title: "Changes to This Privacy Policy",
          paragraphs: [
            "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website.",
            "You are advised to review this Privacy Policy periodically for any changes."
          ]
        },
        {
          title: "Contact Us",
          paragraphs: [
            "If you have any questions about this Privacy Policy, please contact us at:",
            "Email: privacy@biasedfilmreview.com",
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-top: 20px;
  color: #444;
}

p {
  margin: 10px 0;
}

.policy-section {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .privacy-policy {
    padding: 10px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.3rem;
  }
}
</style>