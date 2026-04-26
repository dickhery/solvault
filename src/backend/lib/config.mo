import ConfigTypes "../types/config";
import CommonTypes "../types/common";

module {
  public type AppConfig = ConfigTypes.AppConfig;
  public type Result<T> = CommonTypes.Result<T>;

  public func getConfig(config : { var value : AppConfig }) : AppConfig {
    config.value;
  };

  public func updateConfig(
    config : { var value : AppConfig },
    newConfig : AppConfig,
  ) : Result<()> {
    config.value := newConfig;
    #ok(());
  };
};
