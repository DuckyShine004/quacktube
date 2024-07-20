# Use node 18 runtime as the parent image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

# Install any needed packages specified in package.json
RUN npm install

# Copy app source inside the docker image
COPY . .

# Make port 3000 available outside this container
EXPOSE 3000

# Define the command to run the app using CMD
CMD ["npm", "start"]
