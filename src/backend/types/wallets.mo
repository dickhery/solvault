import Common "common";
import Config "config";

module {
  public type VaultKind = { #sol; #nft };

  public type WalletSession = {
    solanaAddress : Text;
    role : Common.Role;
    solDepositPublicKey : Blob;
    nftDepositPublicKey : Blob;
    config : Config.AppConfig;
  };
};
