import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    const feeReceiverAddress = process.env.FEE_RECEIVER_ADDRESS;
    const initialBaseURIForDay1 = process.env.BASE_URI || "https://basevatar.vercel.app/api/metadata/1/";
    const initialContractURI = process.env.CONTRACT_URI || "https://basevatar.vercel.app/api/collection-metadata";
    const initialOwner = deployer.address;

    console.log("Deploying NFT contract with the following parameters:");
    console.log("  Fee Receiver:", feeReceiverAddress);
    console.log("  Initial Owner:", initialOwner);
    console.log("  Initial Base URI Day 1:", initialBaseURIForDay1);
    console.log("  Initial Contract URI:", initialContractURI);

    const nft = await ethers.deployContract("NFT", [feeReceiverAddress, initialOwner]);
    await nft.waitForDeployment();

    console.log("NFT Contract Deployed at " + nft.target);

    // Set the base URI for Day 1 immediately after deployment
    if (initialBaseURIForDay1) {
        console.log(`Setting Base URI for Day 1 to: ${initialBaseURIForDay1}`);
        const tx = await nft.setBaseURIForDay(1, initialBaseURIForDay1);
        await tx.wait();
        console.log("Base URI for Day 1 has been set.");
    }

    // Set the contract URI for collection metadata
    if (initialContractURI) {
        console.log(`Setting Contract URI to: ${initialContractURI}`);
        const contractURITx = await nft.setContractURI(initialContractURI);
        await contractURITx.wait();
        console.log("Contract URI has been set.");
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
