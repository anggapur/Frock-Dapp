require('dotenv').config();

usePlugin("@nomiclabs/buidler-ethers");
usePlugin("@nomiclabs/buidler-waffle");
usePlugin("@openzeppelin/buidler-upgrades");

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  // This is a sample solc configuration that specifies which version of solc to use
  solc: {
    version: "0.6.8",
  },
  defaultNetwork: 'buidlerevm',
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/9eAJqW3MQLB1X_4OFjncOUj1vopwTKuU `,
      accounts: [
        "7ba3b39dde406b9dfb768ddaf2dc282db5fae50b817dba962c08c88d582ab767"
      ],
    }
  }
};
