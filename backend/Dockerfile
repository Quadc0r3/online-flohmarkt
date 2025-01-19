# Basis-Image für Java
FROM openjdk:17-jdk-alpine

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Jar-Datei kopieren
COPY target/*.jar app.jar

# Port öffnen
EXPOSE 8080

# Start-Befehl
CMD ["java", "-jar", "app.jar"]