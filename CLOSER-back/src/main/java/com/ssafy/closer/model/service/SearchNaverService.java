package com.ssafy.closer.model.service;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.util.Map;

public interface SearchNaverService {
    String findKeyword(String keyword);
}
