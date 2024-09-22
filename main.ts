import { loadSync } from "@std/dotenv";
import { TronWeb } from "tronweb";

export interface TronWallet {
  address: {
    base58: string;
    hex: string;
  };
  privateKey: string;
  publicKey: string;
}

export async function createTronWallet(): Promise<TronWallet> {

  try {

    loadSync({ export: true });

    const tronNetwork: string | undefined = Deno.env.get("TRON_NETWORK");
    if (tronNetwork) {

      // console.log(tronNetwork);
      const adminPrivateKey: string | undefined = Deno.env.get("ADMIN_PRIVATE_KEY");
      if (adminPrivateKey) {

        // console.log(adminPrivateKey);

        try {

          const tronWeb: TronWeb = new TronWeb(
            tronNetwork,
            tronNetwork,
            tronNetwork,
            adminPrivateKey,
          );
          // console.log(tronWeb);

          try {

            return await tronWeb.createAccount();

          } catch (error: unknown) {

            throw new Error(`Error: Failed to create account. ${error}`);
          }

        } catch (error: unknown) {

          throw new Error(`Error: Failed to create TronWeb instance. ${error}`);
        }

      } else {

        throw new Error('ADMIN_PRIVATE_KEY is not defined in the environment variables.');
      }
    } else {

      throw new Error('TRON_NETWORK is not defined in the environment variables.');
    }

  } catch (error: unknown) {

    if (error instanceof Deno.errors.NotFound) {

      throw new Error(`Error: The file does not exist at the specified path. ${error.cause}`);

    } else if (error instanceof Deno.errors.PermissionDenied) {

      throw new Error(`Error: Permission denied to read the file at the specified path. ${error.cause}`);

    } else if (error instanceof SyntaxError) {

      throw new Error(`Error: Invalid syntax in the .env file. ${error.message}`);

    } else {

      throw new Error(`Error: Failed to parse the .env file. ${error}`);
    }
  }
}

if (import.meta.main) {
  createTronWallet().then((account: TronWallet) => {

    console.log(account);

  }).catch((error: unknown) => {

    console.error(`Error: Failed to create account.`, error);
  });
}
