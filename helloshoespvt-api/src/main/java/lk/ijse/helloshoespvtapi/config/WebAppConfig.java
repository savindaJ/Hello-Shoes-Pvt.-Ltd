package lk.ijse.helloshoespvtapi.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Configuration
public class WebAppConfig {
    @Bean
    public ModelMapper test(){
        return new ModelMapper();
    }
}
