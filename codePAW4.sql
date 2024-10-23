#aluguelcreate database projeto4bim;
use projeto4bim;
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema projPAW
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projPAW
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projPAW` DEFAULT CHARACTER SET utf8 ;
USE `projPAW` ;

-- -----------------------------------------------------
-- Table `projPAW`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projPAW`.`clientes` (
  `id_clientes` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(15) NULL,
  PRIMARY KEY (`id_clientes`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `telefone_UNIQUE` (`telefone` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projPAW`.`Carros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projPAW`.`Carros` (
  `id_carros` INT NOT NULL AUTO_INCREMENT,
  `modelo` VARCHAR(255) NOT NULL,
  `ano` INT UNSIGNED NOT NULL,
  `marca` VARCHAR(255) NOT NULL,
  `disponivel` TINYINT(1) NULL,
  PRIMARY KEY (`id_carros`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projPAW`.`aluguel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projPAW`.`aluguel` (
  `id` INT UNSIGNED NULL AUTO_INCREMENT,
  `clientes_id_clientes` INT NOT NULL,
  `Carros_id_carros` INT NOT NULL,
  `data_inicio` DATE NOT NULL,
  `data_fim` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_aluguel_clientes_idx` (`clientes_id_clientes` ASC) ,
  INDEX `fk_aluguel_Carros1_idx` (`Carros_id_carros` ASC) ,
  CONSTRAINT `fk_aluguel_clientes`
    FOREIGN KEY (`clientes_id_clientes`)
    REFERENCES `projPAW`.`clientes` (`id_clientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_aluguel_Carros1`
    FOREIGN KEY (`Carros_id_carros`)
    REFERENCES `projPAW`.`Carros` (`id_carros`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SELECT * FROM clientes;
