import { FC, lazy, LazyExoticComponent } from "react";

export const lazyComponent = (
  name: string,
  importer: Promise<Record<string, FC>>
): LazyExoticComponent<FC> =>
  lazy(async () => {
    const component = await importer;
    return { default: component[name] };
  });

export const getSoldBatches = (sellerDefaultPubKey: String, batchData: any) => {
  if (!batchData || batchData.length === 0) {
    return 0;
  }

  let batches = 0;
  batchData.map((batch: any) => {
    if (batch.seller_pubkey === sellerDefaultPubKey) {
      batches++;
    }
  });

  return batches;
};

export const getChickens = (batchData: any) => {

  if (!batchData || batchData.length === 0) {
    return 0;
  }

  let chickens = 0;

  batchData.map((batch: any) => {
    chickens += batch.batch_size;
  });

  return chickens
};
