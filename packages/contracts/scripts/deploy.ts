import { ethers } from "hardhat"

async function main() {
    const [deployer] = await ethers.getSigners()
    console.log("Deploying contracts with the account:", deployer.address)
    const FireFactory = await ethers.getContractFactory("Fire")
    const Fire = await FireFactory.deploy(10000000, 200, 1)
    console.log("Fire deployed to:", Fire.target)
    // transfer 1 ETH to specific address
    await deployer.sendTransaction({
        to: "0xB5e30182B2EC04A58C8dFaB9f0E42Bbd5a551618",
        value: ethers.parseEther("1")
    })
    await deployer.sendTransaction({
        to: "0x90A1ad9E7c86590Fb8eD813bA7f93a6799fBF8b7",
        value: ethers.parseEther("1")
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })