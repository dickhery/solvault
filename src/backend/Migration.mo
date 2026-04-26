import ConfigTypes "types/config";

module {
  public type PreviousAppConfig = ConfigTypes.AppConfig;

  // Normalize appConfig during upgrade. Caffeine's current reimport path is
  // checking against an already-expanded AppConfig shape, so this migration
  // preserves the stored values while still emitting an explicit migration
  // signature for stable compatibility.
  public func migration(
    old : {
      appConfig : { var value : PreviousAppConfig };
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
          collectionPaymentAddress = previous.collectionPaymentAddress;
          solanaRpcUrl = previous.solanaRpcUrl;
          network = previous.network;
          thresholdKeyName = previous.thresholdKeyName;
        };
      };
    };
  };
};
