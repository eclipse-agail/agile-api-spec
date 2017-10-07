# The only dependency for Agile DBus java interface is DBus java
# The dependency will be installed on the deps folder of the parent directory


#!bin/sh

CURRDIR=`pwd`
DEPS=$CURRDIR/deps
BUILD=$DEPS/build


if [ -e "$DEPS" ]; then
  rm $DEPS -rf
fi

cd $CURRDIR

mkdir -p $BUILD

DBUSJAVA=2.9 #note: this is not an official release, that stopped at 2.7
LMLIB=0.8

#Install libmatthew-java first

wget http://www.matthew.ath.cx/projects/java/libmatthew-java-$LMLIB.tar.gz
tar -xzf libmatthew-java-$LMLIB.tar.gz
rm libmatthew-java-$LMLIB.tar.gz

mv libmatthew-java-$LMLIB $BUILD

cd $BUILD/libmatthew-java-$LMLIB

make >> /dev/null
PREFIX=$BUILD make install

cp ./*.jar $DEPS
cp ./*.so $DEPS
cp ./libunix-java.so $DEPS/unix-java.so


#Install dbus-java

git clone https://github.com/Agile-IoT/dbus-java.git dbus-java-$DBUSJAVA
( cd dbus-java-$DBUSJAVA && git checkout $DBUSJAVA )

mv dbus-java-$DBUSJAVA $BUILD

cd $BUILD/dbus-java-$DBUSJAVA

PREFIX=$BUILD JAVAUNIXLIBDIR=$BUILD/lib/jni JAVAUNIXJARDIR=$BUILD/share/java make bin

cp ./*.jar $DEPS

#Remove the temporary build directory
rm -rf $BUILD

cd $DEPS

#Remove dbus-java and lib matthew libraries if already exist in the local maven repository

if [ -e ~/.m2/repository/org/freedesktop/dbus-java ] ; then
  rm -r ~/.m2/repository/org/freedesktop/dbus-java
  rm -r ~/.m2/repository/org/freedesktop/libdbus-java
  rm -r ~/.m2/repository/cx/ath
fi

#Install the libraries into maven local repository

mvn install:install-file -Dfile=$DEPS/dbus-java-bin-$DBUSJAVA.jar \
                         -DgroupId=org.freedesktop.dbus \
                         -DartifactId=dbus-java \
                         -Dversion=$DBUSJAVA \
                         -Dpackaging=jar \
                         -DgeneratePom=true \
                         -DlocalRepositoryPath=$DEPS

mvn install:install-file -Dfile=$DEPS/libdbus-java-$DBUSJAVA.jar \
                         -DgroupId=org.freedesktop.dbus \
                         -DartifactId=libdbus-java \
                         -Dversion=$DBUSJAVA \
                         -Dpackaging=jar \
                         -DgeneratePom=true \
                         -DlocalRepositoryPath=$DEPS

mvn install:install-file -Dfile=$DEPS/unix-0.5.jar \
                         -DgroupId=cx.ath.matthew \
                         -DartifactId=unix \
                         -Dversion=0.5 \
                         -Dpackaging=jar \
                         -DgeneratePom=true \
                         -DlocalRepositoryPath=$DEPS

mvn install:install-file -Dfile=$DEPS/debug-enable-1.1.jar \
                         -DgroupId=cx.ath.matthew \
                         -DartifactId=debug-enable \
                         -Dversion=1.1 \
                         -Dpackaging=jar \
                         -DgeneratePom=true \
                         -DlocalRepositoryPath=$DEPS

mvn install:install-file -Dfile=$DEPS/debug-disable-1.1.jar \
                         -DgroupId=cx.ath.matthew \
                         -DartifactId=debug-disable \
                         -Dversion=1.1 \
                         -Dpackaging=jar \
                         -DgeneratePom=true \
                         -DlocalRepositoryPath=$DEPS

mvn install:install-file -Dfile=$DEPS/cgi-0.6.jar \
                         -DgroupId=cx.ath.matthew \
                         -DartifactId=cgi \
                         -Dversion=0.6 \
                         -Dpackaging=jar \
                         -DgeneratePom=true \
                         -DlocalRepositoryPath=$DEPS

mvn install:install-file -Dfile=$DEPS/hexdump-0.2.jar \
                         -DgroupId=cx.ath.matthew \
                         -DartifactId=hexdump \
                         -Dversion=0.2 \
                         -Dpackaging=jar \
                         -DgeneratePom=true \
                         -DlocalRepositoryPath=$DEPS

mvn install:install-file -Dfile=$DEPS/io-0.1.jar \
                         -DgroupId=cx.ath.matthew \
                         -DartifactId=io \
                         -Dversion=0.1 \
                         -Dpackaging=jar \
                         -DgeneratePom=true \
                         -DlocalRepositoryPath=$DEPS
