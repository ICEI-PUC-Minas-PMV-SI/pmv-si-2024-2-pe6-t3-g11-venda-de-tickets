# Use a imagem base do OpenJDK
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho
WORKDIR /app

# Copie o JAR repackaged do seu projeto para a imagem
COPY target/TickTag-1.0.0.jar app.jar

# Comando para executar o aplicativo
ENTRYPOINT ["java", "-jar", "app.jar"]
