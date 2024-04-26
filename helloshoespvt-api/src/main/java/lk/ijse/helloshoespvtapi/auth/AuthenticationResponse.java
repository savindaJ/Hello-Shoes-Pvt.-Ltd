package lk.ijse.helloshoespvtapi.auth;

import lk.ijse.helloshoespvtapi.enums.Role;

import java.io.Serializable;

public record AuthenticationResponse(String jwt, String username, String profilePic, Role role) implements Serializable {
}
