import { BigInt } from "@graphprotocol/graph-ts"
import {
  fractionaliseEvent,
  mergeEvent
} from "../generated/Fraction/Fraction"
import { Token } from "../generated/schema"

export function handlefractionaliseEvent(event: fractionaliseEvent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let userEntity = User.load(event.params.sender.toHex())

  // if(!userEntity) {
  //   userEntity = new User(event.params.sender.toHex())
  //   userEntity.sender = event.params.sender
  //   userEntity.save()
  // }
  

  // let originalContractEntity = OriginalContract.load(event.params.originalNftContract.toHex())

  // if(!originalContractEntity) {
  //   originalContractEntity = new OriginalContract(event.params.originalNftContract.toHex())
  //   originalContractEntity.owner = userEntity.id
  //   originalContractEntity.contract = event.params.originalNftContract
  //   originalContractEntity.save()
  // }
  

  // let fractionContractEntity = FractionContract.load(event.params.fractionNftContract.toHex())
  
  // if(!fractionContractEntity) {
  //   fractionContractEntity = new FractionContract(event.params.fractionNftContract.toHex())
  //   fractionContractEntity.owner = userEntity.id
  //   fractionContractEntity.contract = event.params.fractionNftContract
  //   fractionContractEntity.originalContract = originalContractEntity.id
  //   fractionContractEntity.save()
  // }

  let tokenEntity = Token.load(event.params.fractionNftContract.toHex() + "-" + event.params.tokenId.toString())

  if(!tokenEntity) {
    tokenEntity = new Token(event.params.fractionNftContract.toHex() + "-" + event.params.tokenId.toString())
    tokenEntity.tokenId = event.params.tokenId
    tokenEntity.owner = event.params.sender
    tokenEntity.fractionContract = event.params.fractionNftContract
    tokenEntity.originalContract = event.params.originalNftContract
    tokenEntity.fractionCount = event.params.fractionCount
    tokenEntity.tokenURI = event.params.tokenURI
    tokenEntity.save()
  }
}

export function handlemergeEvent(event: mergeEvent): void {
  
  let tokenEntity = Token.load(event.params.fractionNftContract.toHex() + "-" + event.params.tokenId.toString())
  if(tokenEntity) {
    tokenEntity.fractionCount = BigInt.fromString('0')
    tokenEntity.save()
  }
}
