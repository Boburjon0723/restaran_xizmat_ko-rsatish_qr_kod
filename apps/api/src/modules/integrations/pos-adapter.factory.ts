import { Injectable } from "@nestjs/common";
import { IikoAdapter } from "./adapters/iiko.adapter";
import { JowiAdapter } from "./adapters/jowi.adapter";
import { RkeeperAdapter } from "./adapters/rkeeper.adapter";
import { PosAdapter, PosType } from "./interfaces/pos-adapter.interface";

@Injectable()
export class PosAdapterFactory {
  constructor(
    private readonly jowiAdapter: JowiAdapter,
    private readonly rkeeperAdapter: RkeeperAdapter,
    private readonly iikoAdapter: IikoAdapter
  ) {}

  getAdapter(posType: PosType): PosAdapter {
    switch (posType) {
      case "jowi":
        return this.jowiAdapter;
      case "rkeeper":
        return this.rkeeperAdapter;
      case "iiko":
        return this.iikoAdapter;
      default:
        throw new Error("Unsupported POS type");
    }
  }
}
