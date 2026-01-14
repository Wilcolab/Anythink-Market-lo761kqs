FROM node:14
WORKDIR /app

# Copy from the local 'src' folder into the container's '/app'
COPY src/package*.json ./
RUN yarn install && yarn global add nodemon

# Copy the rest of the files from 'src'
COPY src/ .

EXPOSE 8001
# Now index.js is directly in /app inside the container
CMD ["nodemon", "index.js"]