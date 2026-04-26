import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ConfigTypes "../types/config";
import CommonTypes "../types/common";
import ConfigLib "../lib/config";

mixin (
  accessControlState : AccessControl.AccessControlState,
  appConfig : { var value : ConfigTypes.AppConfig },
) {
  /// Get current app configuration.
  public query func getConfig() : async ConfigTypes.AppConfig {
    ConfigLib.getConfig(appConfig);
  };

  /// Admin only: update app configuration.
  public shared ({ caller }) func updateConfig(config : ConfigTypes.AppConfig) : async CommonTypes.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update app configuration");
    };
    ConfigLib.updateConfig(appConfig, config);
  };
};
