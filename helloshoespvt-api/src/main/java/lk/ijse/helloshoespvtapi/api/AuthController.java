package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.UserDto;
import lk.ijse.helloshoespvtapi.enums.Role;
import lk.ijse.helloshoespvtapi.auth.AuthenticationRequest;
import lk.ijse.helloshoespvtapi.auth.AuthenticationResponse;
import lk.ijse.helloshoespvtapi.service.UserDetailService;
import lk.ijse.helloshoespvtapi.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationProvider authenticationManager;
    private final JwtUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    private final UserDetailService userDetailService;

    public AuthController(AuthenticationProvider authenticationManager, JwtUtil jwtTokenUtil, UserDetailsService userDetailsService, UserDetailService userDetailService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.userDetailService = userDetailService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        UserDto userDto = null;
        String profilePic = null;
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword())
            );
            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(authenticationRequest.getUsername());
            final String jwt = jwtTokenUtil.generateToken(userDetails.getUsername());
            userDto = userDetailService.loginUser(userDetails.getUsername());
            if (userDto.getRole().equals(Role.SUPER_ADMIN)) {
                profilePic = "11znDDHfMXG2uVpAw9H3JU2sMchS5r8_u";
            } else {
                profilePic = userDto.getProfilePic();
            }
            return ResponseEntity.ok(new AuthenticationResponse(jwt, userDto.getUserName(), profilePic, userDto.getRole()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
    }
}