package br.com.ticktag.util;

import java.io.IOException;
import java.util.Base64;

public class ImagemUtils {
	
	public static byte[] base64ToBytes(String base64) throws IOException {
        
        return Base64.getDecoder().decode(base64);
    }
	
}
