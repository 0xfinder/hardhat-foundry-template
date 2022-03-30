-include .env

# Deps
update:; yarn upgrade

# Build & test
build  :; npx hardhat compile
test   :; npx hardhat test
