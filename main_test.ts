import { assertEquals } from "@std/assert";
import { createTronWallet } from "./main.ts";
import { TronWallet } from "./main.ts";

Deno.test("createTronWallet Test", async () => {

  const tronWallet: TronWallet = await createTronWallet();
  console.log(tronWallet);

  assertEquals(typeof tronWallet, "object");
  assertEquals(typeof tronWallet.address, "object");
  assertEquals(typeof tronWallet.privateKey, "string");
  assertEquals(typeof tronWallet.publicKey, "string");
});
