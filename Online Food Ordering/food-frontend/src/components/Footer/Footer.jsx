import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LocationOn, Phone, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" className="bg-gray-900 text-white py-12 mt-16">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" className="font-display text-gradient font-bold mb-4">
              FoodieHub
            </Typography>
            <Typography variant="body2" className="text-gray-300 mb-4 leading-relaxed">
              Discover the best restaurants in your city. Order your favorite meals with just a few clicks 
              and enjoy fast, reliable delivery right to your doorstep.
            </Typography>
            <Box className="flex gap-2">
              <IconButton className="text-gray-300 hover:text-primary-400 transition-colors">
                <Facebook />
              </IconButton>
              <IconButton className="text-gray-300 hover:text-primary-400 transition-colors">
                <Twitter />
              </IconButton>
              <IconButton className="text-gray-300 hover:text-primary-400 transition-colors">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" className="font-semibold mb-4 text-white">
              Quick Links
            </Typography>
            <Box className="flex flex-col gap-2">
              <Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors no-underline">
                Home
              </Link>
              <Link href="/restaurants" className="text-gray-300 hover:text-primary-400 transition-colors no-underline">
                Restaurants
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors no-underline">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors no-underline">
                Contact
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" className="font-semibold mb-4 text-white">
              Customer Support
            </Typography>
            <Box className="flex flex-col gap-2">
              <Link href="/help" className="text-gray-300 hover:text-primary-400 transition-colors no-underline">
                Help Center
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-primary-400 transition-colors no-underline">
                FAQ
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-primary-400 transition-colors no-underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-primary-400 transition-colors no-underline">
                Privacy Policy
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" className="font-semibold mb-4 text-white">
              Contact Info
            </Typography>
            <Box className="flex flex-col gap-3">
              <Box className="flex items-center gap-2">
                <LocationOn className="text-primary-400" />
                <Typography variant="body2" className="text-gray-300">
                  123 Food Street, City Center
                </Typography>
              </Box>
              <Box className="flex items-center gap-2">
                <Phone className="text-primary-400" />
                <Typography variant="body2" className="text-gray-300">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box className="flex items-center gap-2">
                <Email className="text-primary-400" />
                <Typography variant="body2" className="text-gray-300">
                  support@foodiehub.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box className="border-t border-gray-700 mt-8 pt-6">
          <Typography variant="body2" className="text-center text-gray-400">
            © 2024 FoodieHub. All rights reserved. Made with ❤️ for food lovers.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
