import Common "common";

module {
  public type Role = Common.Role;

  public type UserProfile = {
    solanaAddress : Text;
    role : Role;
    joinedAt : Common.Timestamp;
    createdCollections : [Text];
  };
};
