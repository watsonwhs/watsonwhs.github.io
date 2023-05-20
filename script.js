window.addEventListener('DOMContentLoaded', (event) => {
    let isWalletConnected = false;

    // Connect to Web3 provider
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    } else {
        console.log('Web3 provider not found. Please install a wallet like MetaMask.');
    }

    // Handle wallet connection
    document.getElementById('connect-wallet').addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const address = window.web3.currentProvider.selectedAddress;
                const formattedAddress = formatAddress(address);
                document.getElementById('wallet-address').innerHTML = formattedAddress;
                document.getElementById('connect-wallet').style.display = 'none';
                document.getElementById('disconnect-wallet').style.display = 'inline-block';
                isWalletConnected = true;
                console.log('Connected to wallet:', address);
            } catch (error) {
                console.log('Wallet connection error:', error);
            }
        } else {
            console.log('Web3 provider not found. Please install a wallet like MetaMask.');
        }
    });

    // Handle wallet disconnection
    document.getElementById('disconnect-wallet').addEventListener('click', () => {
        if (isWalletConnected) {
            disconnectWallet();
        }
    });

    // Format wallet address
    function formatAddress(address) {
        const length = address.length;
        const visibleLength = 4;
        const ellipsis = '...';
        const start = address.substring(0, visibleLength);
        const end = address.substring(length - visibleLength, length);
        return start + ellipsis + end;
    }

    // Disconnect wallet
    async function disconnectWallet() {
        if (window.ethereum) {
            try {
                await window.ethereum.send('eth_chainId');
                document.getElementById('wallet-address').innerHTML = '';
                document.getElementById('connect-wallet').style.display = 'inline-block';
                document.getElementById('disconnect-wallet').style.display = 'none';
                isWalletConnected = false;
                console.log('Disconnected from wallet');
            } catch (error) {
                console.log('Wallet disconnection error:', error);
            }
        }
    }
});
