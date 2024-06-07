<template>
  <div class="terms-of-service">
    <h1>Terms of Service</h1>
    <p>Last updated: June 7, 2024</p>
    
    <section v-for="section in termsSections" :key="section.title" class="terms-section">
      <h2>{{ section.title }}</h2>
      <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "TermsOfService",
  data() {
    return {
      termsSections: [
        {
          title: "Introduction",
          paragraphs: [
            "Welcome to our web app. By accessing or using our services, you agree to be bound by these Terms of Service.",
            "If you do not agree with any part of these terms, you may not use our services."
          ]
        },
        {
          title: "User Accounts",
          paragraphs: [
            "To use certain features of our services, you may need to create an account.",
            "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
          ]
        },
        {
          title: "Use of Services",
          paragraphs: [
            "You agree to use our services only for lawful purposes and in accordance with these Terms of Service.",
            "You agree not to use our services in any way that could harm, disable, overburden, or impair our servers or networks."
          ]
        },
        {
          title: "Content",
          paragraphs: [
            "Our services allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ('Content').",
            "You are responsible for the Content that you post on or through our services, including its legality, reliability, and appropriateness."
          ]
        },
        {
          title: "Intellectual Property",
          paragraphs: [
            "The content, design, graphics, and other materials on our services are protected by intellectual property laws.",
            "You agree not to reproduce, distribute, or create derivative works based on our content without our prior written permission."
          ]
        },
        {
          title: "Termination",
          paragraphs: [
            "We may terminate or suspend your account and bar access to our services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.",
            "If you wish to terminate your account, you may simply discontinue using our services."
          ]
        },
        {
          title: "Limitation of Liability",
          paragraphs: [
            "In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use our services; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage."
          ]
        },
        {
          title: "Governing Law",
          paragraphs: [
            "These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.",
            "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
          ]
        },
        {
          title: "Changes to These Terms",
          paragraphs: [
            "We reserve the right, at our sole discretion, to modify or replace these Terms at any time.",
            "If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
          ]
        },
        {
          title: "Contact Us",
          paragraphs: [
            "If you have any questions about these Terms, please contact us at:",
            "Email: support@biasedfilmreview.com",
            "Address: 123 Movie Lane, Nairobi, Kenya"
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.terms-of-service {
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

.terms-section {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .terms-of-service {
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
