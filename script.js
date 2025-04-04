
const nearAPI = window.nearApi;

async function connectWallet() {
  const { keyStores, connect, WalletConnection } = nearAPI;
  const config = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  const near = await connect(config);
  const wallet = new WalletConnection(near);

  if (!wallet.isSignedIn()) {
    wallet.requestSignIn();
  } else {
    alert("Connected: " + wallet.getAccountId());
    showProfile(wallet.getAccountId());
  }
}

function showProfile(accountId) {
  const link = `https://explorer.testnet.near.org/accounts/${accountId}`;
  document.getElementById("profile").innerHTML = `
    <h2>${accountId}'s Profile</h2>
    <p><a href="${link}" target="_blank">View on NEAR Explorer</a></p>
    <p><a href="share-card.png" download>Download Share Image</a></p>
    <p><a href="https://twitter.com/intent/tweet?text=I%20just%20claimed%20my%20Echoes%20of%20Solitude%20NFT!%20Follow%20the%20journey%20at%20https://city-of-solitude.vercel.app" target="_blank">Share on Twitter</a></p>
  `;
}
