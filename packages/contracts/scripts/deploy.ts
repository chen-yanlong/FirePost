import { ethers } from "hardhat"

async function main() {
    const [deployer] = await ethers.getSigners()
    console.log("Deploying contracts with the account:", deployer.address)
    const FireFactory = await ethers.getContractFactory("Fire")
    const Fire = await FireFactory.deploy(10000000, 200, 1)
    console.log("Fire deployed to:", Fire.target)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })