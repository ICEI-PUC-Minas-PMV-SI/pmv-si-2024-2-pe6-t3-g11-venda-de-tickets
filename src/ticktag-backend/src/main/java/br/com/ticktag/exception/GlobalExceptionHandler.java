package br.com.ticktag.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.net.BindException;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<String>> validationHandler(ConstraintViolationException e) {
        List<String> errors = new ArrayList<>(e.getConstraintViolations().size());
        e.getConstraintViolations().forEach(violation -> {
            errors.add(violation.getPropertyPath() + " : " + violation.getMessage());
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<StackTraceElement[]> handleException(BindException ex) {
        return new ResponseEntity<>(ex.getStackTrace(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TickTagException.class)
    public ResponseEntity<StackTraceElement[]> handleException(TickTagException ex) {
        return new ResponseEntity<>(ex.getStackTrace(), HttpStatus.BAD_REQUEST);
    }
}
