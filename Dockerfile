# Menggunakan base image PHP 8.3 dengan Apache
FROM php:8.3-apache

# Menginstal dependensi sistem dan ekstensi PHP untuk database MySQL
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo_mysql zip

# Mengaktifkan modul rewrite Apache (wajib untuk routing API Laravel)
RUN a2enmod rewrite

# Menginstal Composer (Manajer dependensi PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Mengatur folder kerja utama di dalam server cloud
WORKDIR /var/www/html

# Menyalin seluruh file project Laravel lo ke dalam server
COPY . .

# Menginstal package bawaan Laravel
RUN composer install --no-dev --optimize-autoloader

# Mengubah titik awal web server agar langsung membaca folder public/ Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Mengatur izin akses (permissions) untuk folder storage dan cache agar tidak error
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Membuka port 80 standar
EXPOSE 80 in