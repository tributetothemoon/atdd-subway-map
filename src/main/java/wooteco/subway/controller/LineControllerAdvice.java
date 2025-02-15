package wooteco.subway.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice(assignableTypes = {LineController.class})
public class LineControllerAdvice {

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<String> handleDuplicateUniqueColumnException(DuplicateKeyException exception) {
        return ResponseEntity.badRequest()
                .body("이미 존재하는 노선 이름입니다.");
    }
}
