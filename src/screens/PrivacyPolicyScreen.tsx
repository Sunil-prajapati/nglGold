import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Typography from '../components/Typography';
import { useTheme } from '../context/ThemeContext';
import { THEME_COLORS } from '../constants/ThemeColors';

const PrivacyPolicyScreen = () => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <Typography variant="h4" color={colors.text} style={styles.title}>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" color={colors.text} style={styles.section}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
        
        <Typography variant="h6" color={colors.text} style={styles.sectionTitle}>
          1. Introduction
        </Typography>
        <Typography variant="body1" color={colors.text} style={styles.paragraph}>
          Welcome to NglGold. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you about how we look after your personal data when you visit our 
          application and tell you about your privacy rights and how the law protects you.
        </Typography>
        
        <Typography variant="h6" color={colors.text} style={styles.sectionTitle}>
          2. Data We Collect
        </Typography>
        <Typography variant="body1" color={colors.text} style={styles.paragraph}>
          We may collect, use, store and transfer different kinds of personal data about you which we have 
          grouped together as follows:
          • Identity Data: includes first name, last name, username or similar identifier
          • Contact Data: includes email address and telephone numbers
          • Technical Data: includes internet protocol (IP) address, your login data, browser type and version
        </Typography>
        
        {/* Add more sections as needed */}
        
        <Typography variant="h6" color={colors.text} style={styles.sectionTitle}>
          3. Contact Us
        </Typography>
        <Typography variant="body1" color={colors.text} style={styles.paragraph}>
          If you have any questions about this privacy policy or our privacy practices, please contact us at:
          support@nglgold.com
        </Typography>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;