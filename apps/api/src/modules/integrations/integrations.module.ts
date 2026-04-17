import { Module } from "@nestjs/common";
import { IikoAdapter } from "./adapters/iiko.adapter";
import { JowiAdapter } from "./adapters/jowi.adapter";
import { RkeeperAdapter } from "./adapters/rkeeper.adapter";
import { PosAdapterFactory } from "./pos-adapter.factory";

@Module({
  providers: [JowiAdapter, RkeeperAdapter, IikoAdapter, PosAdapterFactory],
  exports: [PosAdapterFactory]
})
export class IntegrationsModule {}
