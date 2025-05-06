# Base image
FROM --platform=linux/amd64 node:18

# Install Zsh and Oh My Zsh
RUN apt-get update && apt-get install -y zsh \
    && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && npm install -g @angular/cli

# Install Oh My Zsh plugins
RUN git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Enable Oh My Zsh plugins in .zshrc
RUN sed -i 's/plugins=(git)/plugins=(git zsh-syntax-highlighting zsh-autosuggestions)/' ~/.zshrc

# Set Zsh as the default shell
SHELL ["/bin/zsh", "-c"]

# set the xiong-chiamiov-plus theme
RUN sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="xiong-chiamiov-plus"/' ~/.zshrc

# Install Selenium dependencies
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && apt-get update

RUN apt-get install -y google-chrome-stable

# Set the working directory
WORKDIR /workspace

# Copy project files from the context of the build
COPY . /workspace

# Expose port 4200 for Angular
EXPOSE 4200

# Set Zsh as the default shell
CMD ["zsh"]