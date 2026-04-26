import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserTypes "../types/users";
import CommonTypes "../types/common";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Text, UserTypes.UserProfile>,
) {
  /// Register caller's Solana wallet address; first caller becomes admin.
  public shared ({ caller }) func registerUser(solanaAddress : Text) : async CommonTypes.Role {
    if (solanaAddress.size() == 0) {
      Runtime.trap("solanaAddress must not be empty");
    };
    UserLib.registerUser(users, accessControlState, solanaAddress, caller);
  };

  /// Lookup any user profile by Solana address.
  public query func getUser(solanaAddress : Text) : async ?UserTypes.UserProfile {
    UserLib.getUser(users, solanaAddress);
  };

  /// Returns the role of the calling principal.
  public query ({ caller }) func getMyRole() : async CommonTypes.Role {
    UserLib.getMyRole(accessControlState, caller);
  };
};
