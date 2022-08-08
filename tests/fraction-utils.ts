import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { fractionaliseEvent, mergeEvent } from "../generated/Fraction/Fraction"

export function createfractionaliseEventEvent(
  sender: Address,
  originalNftContract: Address,
  tokenId: BigInt,
  fractionCount: BigInt,
  fractionNftContract: Address
): fractionaliseEvent {
  let fractionaliseEventEvent = changetype<fractionaliseEvent>(newMockEvent())

  fractionaliseEventEvent.parameters = new Array()

  fractionaliseEventEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  fractionaliseEventEvent.parameters.push(
    new ethereum.EventParam(
      "originalNftContract",
      ethereum.Value.fromAddress(originalNftContract)
    )
  )
  fractionaliseEventEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  fractionaliseEventEvent.parameters.push(
    new ethereum.EventParam(
      "fractionCount",
      ethereum.Value.fromUnsignedBigInt(fractionCount)
    )
  )
  fractionaliseEventEvent.parameters.push(
    new ethereum.EventParam(
      "fractionNftContract",
      ethereum.Value.fromAddress(fractionNftContract)
    )
  )

  return fractionaliseEventEvent
}

export function createmergeEventEvent(
  sender: Address,
  originalNftContract: Address,
  tokenId: BigInt,
  fractionNftContract: Address
): mergeEvent {
  let mergeEventEvent = changetype<mergeEvent>(newMockEvent())

  mergeEventEvent.parameters = new Array()

  mergeEventEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  mergeEventEvent.parameters.push(
    new ethereum.EventParam(
      "originalNftContract",
      ethereum.Value.fromAddress(originalNftContract)
    )
  )
  mergeEventEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  mergeEventEvent.parameters.push(
    new ethereum.EventParam(
      "fractionNftContract",
      ethereum.Value.fromAddress(fractionNftContract)
    )
  )

  return mergeEventEvent
}
