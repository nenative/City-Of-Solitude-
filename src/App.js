import React, { useState } from 'react';
import * as nearAPI from 'near-api-js';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  useToast,
  Flex,
  Icon,
  Badge,
  Divider
} from '@chakra-ui/react';
import { FaWallet, FaTwitter, FaMusic } from 'react-icons/fa';
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const { connect, keyStores, WalletConnection } = nearAPI;
      const config = {
        networkId: 'testnet',
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
      };

      const near = await connect(config);
      const wallet = new WalletConnection(near);
      
      if (!wallet.isSignedIn()) {
        wallet.requestSignIn();
      }
      setWalletConnected(true);
      toast({
        title: "Wallet Connected",
        description: "Your NEAR wallet has been successfully connected!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const claimNFT = async () => {
    setIsLoading(true);
    try {
      // NFT claiming logic will be implemented here
      console.log('NFT claim initiated');
      setClaimed(true);
      
      toast({
        title: "NFT Claimed!",
        description: "Your exclusive preview has been claimed successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      const shareText = encodeURIComponent(
        "I just claimed my exclusive preview of 'City of Solitude' - a groundbreaking new musical in development! 🎭🎵 #CityOfSolitude #FutureOfTheatre"
      );
      window.open(`https://twitter.com/intent/tweet?text=${shareText}`);
    } catch (error) {
      console.error('Error claiming NFT:', error);
      toast({
        title: "Claim Failed",
        description: "Failed to claim NFT. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Box className="App">
        <div className="cyber-grid"></div>
        <Container maxW="container.xl" centerContent className="glass-container">
          <VStack spacing={8} align="center" py={10}>
            <Badge colorScheme="teal" p={2} borderRadius="md">
              Exclusive Preview
            </Badge>
            
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, cyan.400, blue.500)"
              bgClip="text"
              letterSpacing="wider"
              textAlign="center"
            >
              CITY OF SOLITUDE
            </Heading>
            
            <Text
              fontSize="xl"
              color="whiteAlpha.900"
              letterSpacing="wide"
              textAlign="center"
            >
              A NEW MUSICAL IN DEVELOPMENT
            </Text>

            <Divider />

            <Box textAlign="center" p={5}>
              <Text fontSize="lg" mb={4}>
                Be part of theatrical history. Own a piece of tomorrow's stage.
              </Text>
              <Text className="feature-text" fontSize="md">
                Claim your exclusive NFT to unlock a sneak preview of our opening number
                and follow along as we develop this groundbreaking production.
              </Text>
            </Box>

            <Box className="artist-section" p={6} borderRadius="lg">
              <Heading as="h2" size="lg" mb={4} color="cyan.400">
                About the Artist
              </Heading>
              <Text mb={4}>
                The composer is an NYC-based musician, writing under a pseudonym for this
                groundbreaking project. This artistic choice reflects our mission to invert
                and democratize access to the typical development process for new musicals.
              </Text>
              <Text>
                Through this innovative approach, we're exploring how blockchain technology
                can transform the musical theatre landscape, creating new ways for artists
                and fans to connect during the creative process.
              </Text>
            </Box>

            <Flex direction="column" align="center" mt={6}>
              {!walletConnected ? (
                <Button
                  leftIcon={<Icon as={FaWallet} />}
                  onClick={connectWallet}
                  isLoading={isLoading}
                  loadingText="Connecting..."
                  size="lg"
                  colorScheme="teal"
                  variant="outline"
                  _hover={{ bg: "rgba(0, 255, 242, 0.1)" }}
                >
                  Connect NEAR Wallet
                </Button>
              ) : !claimed ? (
                <Button
                  leftIcon={<Icon as={FaMusic} />}
                  onClick={claimNFT}
                  isLoading={isLoading}
                  loadingText="Claiming..."
                  size="lg"
                  colorScheme="cyan"
                  variant="outline"
                  _hover={{ bg: "rgba(0, 255, 242, 0.1)" }}
                >
                  Claim NFT Preview
                </Button>
              ) : (
                <VStack spacing={4} className="success-message" p={6}>
                  <Heading size="md">NFT Claimed Successfully! 🎉</Heading>
                  <Text className="preview-text">
                    Your exclusive preview is being prepared...
                  </Text>
                  <Button
                    leftIcon={<Icon as={FaTwitter} />}
                    onClick={() => {
                      const shareText = encodeURIComponent(
                        "I just got exclusive access to 'City of Solitude' - a groundbreaking new musical in development! 🎭🎵 #CityOfSolitude #FutureOfTheatre"
                      );
                      window.open(`https://twitter.com/intent/tweet?text=${shareText}`);
                    }}
                    colorScheme="twitter"
                    variant="outline"
                  >
                    Share on Twitter
                  </Button>
                </VStack>
              )}
            </Flex>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App; 