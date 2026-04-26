import ConfigTypes "types/config";

module {
  public type LegacyAppConfig = {
    collectionCreationFeeSOL : Float;
    platformFeePercent : Float;
    escrowWalletAddress : Text;
    solanaRpcUrl : Text;
    network : Text;
  };

  // One-time migration for the stable appConfig record used by older imports.
  // Legacy installs only stored the original five fields, so we fill the new
  // config slots with safe defaults derived from the previous config.
  public func migration(
    old : {
      appConfig : { var value : LegacyAppConfig };
    }
  ) : {
    appConfig : { var value : ConfigTypes.AppConfig };
  } {
    let previous = old.appConfig.value;
    {
      appConfig = {
        var value = {
          collectionCreationFeeSOL = previous.collectionCreationFeeSOL;
          platformFeePercent = previous.platformFeePercent;
          escrowWalletAddress = previous.escrowWalletAddress;
          collectionPaymentAddress = previous.escrowWalletAddress;
          solanaRpcUrl = previous.solanaRpcUrl;
          network = previous.network;
          thresholdKeyName = "dfx_test_key";
        };
      };
    };
  };
};
