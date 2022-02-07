/**
 * This Keys are the name column assigned within table Roles.
 */
export enum RolesKey {
  ADMIN = 'admin',
  CLIENT = 'client',
  GUEST = 'guest',
}

export enum RoleMessages {
  ROLE_NAME_LONG = 'The name is too long',
  ROLE_LABEL_LONG = 'The name is too long',
  ROLE_DESCRIPTION_LONG = 'The name is too long',
  ROLE_STATUS_LONG = 'status is too long',
  ROLE_UPDATE_LONG = 'update date is too long',
}

export enum RoleMessagesError {
  ROLE_USER_ID = 'id must be sent',
}
