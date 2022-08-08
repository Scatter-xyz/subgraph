import { BigInt } from "@graphprotocol/graph-ts"
import {
  fractionaliseEvent,
  mergeEvent
} from "../generated/Fraction/Fraction"
import { Token,OriginalContract,FractionContract,User } from "../generated/schema"

export function handlefractionaliseEvent(event: fractionaliseEvent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  let userEntity = new User(event.params.sender.toHex())
  userEntity.sender = event.params.sender
  userEntity.save()
  

  let originalContractEntity = new OriginalContract(event.params.originalNftContract.toHex())
  originalContractEntity.owner = userEntity.id
  originalContractEntity.contract = event.params.originalNftContract
  originalContractEntity.save()
  

  let fractionContractEntity = new FractionContract(event.params.fractionNftContract.toHex())
  fractionContractEntity.owner = userEntity.id
  fractionContractEntity.contract = event.params.fractionNftContract
  fractionContractEntity.originalContract = originalContractEntity.id
  fractionContractEntity.save()
  

  let tokenEntity = new Token(event.params.fractionNftContract.toHex() + "-" + event.params.tokenId.toHex())
  tokenEntity.tokenId = event.params.tokenId
  tokenEntity.owner = userEntity.id
  tokenEntity.fractionContract = fractionContractEntity.id
  tokenEntity.originalContract = originalContractEntity.id
  tokenEntity.fractionCount = event.params.fractionCount
  tokenEntity.save()
}

export function handlemergeEvent(event: mergeEvent): void {
  
  let tokenEntity = Token.load(event.params.fractionNftContract.toHex() + "-" + event.params.tokenId.toHex())
  if(tokenEntity) {
    tokenEntity.fractionCount = BigInt.fromString('0')
    tokenEntity.save();
  }
}
