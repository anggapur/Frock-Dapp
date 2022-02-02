import { BigNumber } from "ethers";

export function calculateNRTAmount(investAmount: BigNumber): BigNumber{
    return investAmount
    .mul(1e9) // To make result on Frock decimals
    .mul(100).div(8) // 0,08, price each frock
    .div(1e6) // neutralize usdc currency decimals   
}