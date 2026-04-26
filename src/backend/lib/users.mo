import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserTypes "../types/users";
import CommonTypes "../types/common";

module {
  public type UserProfile = UserTypes.UserProfile;
  public type Role = CommonTypes.Role;

  public func registerUser(
    users : Map.Map<Text, UserProfile>,
    accessControlState : AccessControl.AccessControlState,
    solanaAddress : Text,
    caller : Principal,
  ) : Role {
    // Determine role: admin if no users exist yet, else regular user
    let role : Role = if (users.isEmpty()) { #admin } else { #user };
    let icRole : AccessControl.UserRole = switch (role) {
      case (#admin) { #admin };
      case (_) { #user };
    };
    AccessControl.assignRole(accessControlState, caller, caller, icRole);

    let profile : UserProfile = {
      solanaAddress;
      role;
      joinedAt = Time.now();
      createdCollections = [];
    };
    users.add(solanaAddress, profile);
    role;
  };

  public func getUser(
    users : Map.Map<Text, UserProfile>,
    solanaAddress : Text,
  ) : ?UserProfile {
    users.get(solanaAddress);
  };

  public func getMyRole(
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
  ) : Role {
    let icRole = AccessControl.getUserRole(accessControlState, caller);
    switch (icRole) {
      case (#admin) { #admin };
      case (#user) { #user };
      case (#guest) { #guest };
    };
  };

  public func addCollectionToUser(
    users : Map.Map<Text, UserProfile>,
    solanaAddress : Text,
    collectionId : Text,
  ) {
    switch (users.get(solanaAddress)) {
      case (?profile) {
        let updated : UserProfile = {
          profile with
          createdCollections = profile.createdCollections.concat([collectionId]);
        };
        users.add(solanaAddress, updated);
      };
      case null {};
    };
  };
};
