import { BigInt, dataSource } from "@graphprotocol/graph-ts";
import { TransferTokens } from "../generated/templates/Wallet/Wallet";
import { Transfer } from "../generated/schema";

export function handleTransferTokens(event: TransferTokens): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Transfer.load(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Transfer(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
  }

  //transfer
  // let transfers = transaction.transfer;

  // BigInt and BigDecimal math are supported

  // Entity fields can be set based on event parameters
  entity.recipient = event.params.recipient;
  entity.tokenAmt = event.params.tokenAmt;
  entity.wallet = event.address.toHexString();
  entity.fee = event.params.fee;
  entity.erc20 = event.params.erc20;
  entity.timestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash.toHexString();

  // Entities can be written to the store with `.save()`
  entity.save();
}
