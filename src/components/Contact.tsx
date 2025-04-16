import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact">
      <div className="container">
        <ContactCard>
          <CardSubtitle>Don't be shy</CardSubtitle>
          <CardTitle>Drop Me a Line</CardTitle>
          
          <ContactWrapper>
            <ContactForm onSubmit={handleSubmit}>
              <ContactInput 
                type="text" 
                name="name" 
                placeholder="Name" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
              <ContactInput 
                type="email" 
                name="email" 
                placeholder="Email" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
              <ContactTextArea 
                name="message" 
                placeholder="Message" 
                required 
                rows={5}
                value={formData.message}
                onChange={handleChange}
              />
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </SubmitButton>
              {submitStatus === 'success' && (
                <SuccessMessage>Message sent successfully!</SuccessMessage>
              )}
              {submitStatus === 'error' && (
                <ErrorMessage>Failed to send message. Please try again.</ErrorMessage>
              )}
            </ContactForm>
            
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <div>
                  <ContactItemTitle>Address</ContactItemTitle>
                  <ContactItemText>Durgapur, West Bengal</ContactItemText>
                </div>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <div>
                  <ContactItemTitle>Email</ContactItemTitle>
                  <ContactItemLink href="mailto:hello@ethan.com">safalmondal0123@gmail.com</ContactItemLink>
                </div>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <FaPhoneAlt />
                </ContactIcon>
                <div>
                  <ContactItemTitle>Phone</ContactItemTitle>
                  <ContactItemLink href="tel:+1234567890">+91 9749294592</ContactItemLink>
                </div>
              </ContactItem>
            </ContactInfo>
          </ContactWrapper>
        </ContactCard>
      </div>
    </ContactSection>
  );
};

// Styled Components
const ContactSection = styled.section`
  padding: 100px 0;
  background: ${({ theme }) => theme.body};
`;

const ContactCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 20px;
  padding: 60px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const CardSubtitle = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CardTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 50px;
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactInput = styled.input`
  padding: 15px 20px;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  
  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
  }
`;

const ContactTextArea = styled.textarea`
  padding: 15px 20px;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  resize: vertical;
  
  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SuccessMessage = styled.p`
  color: #4BB543;
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #FF3333;
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const ContactIcon = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const ContactItemTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
`;

const ContactItemText = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const ContactItemLink = styled.a`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    opacity: 1;
  }
`;

export default Contact;